# Day2

## 1. 스프링 AOP

  - 비즈니스 컴포넌트 개발에서 가장 중요한 두 가지 원칙은 **낮은 결합도**와 **높은 응집도**
  - 스프링의 의존성 주입을 이용하면 비즈니스 컴포넌트를 구성하는 객체들의 결합도를 떨어뜨릴 수 있어서 의존관계를 쉽게 변경 가능
  - IoC - 결합도 vs. AOP - 응집도
  - AOP 이해하기
  
    - AOP(Aspect Oriented Programming)은 예외, 트랜잭션 등의 부가적인 코드들을 효율적으로 관리하는 데 주목
    - **관심 분리(Separation of Concerns)**
    
      - 횡단 관심 : 메소드마다 공통으로 등장하는 로깅, 예외, 트랜잭션 처리 등의 코드
      - 핵심 관심 : 사용자 요청에 따라 실제로 수행되는 핵심 비즈니스 로직
      - 두 관심을 완벽하게 분리할 수 있다면 간결하고 응집도 높은 코드 유지 가능. 하지만 독립적인 모듈로 분리해내기 어려움. => 스프링 AOP가 다소 극복
      
  - AOP 시작하기
  
    - 비즈니스 클래스 수정
    - AOP 라이브러리 추가. pom.xml에 dependency로 추가한다.
    - 네임스페이스 추가 및 AOP 설정
    - 스프링 AOP는 클라이언트가 **핵심 관심에 해당하는 비즈니스 메소드 호출 시, 횡단 관심에 해당하는 메소드를 적절하게 실행**해준다. 소스상 결합 발생 X.
    
<br>

## 2. AOP 용어 및 기본 설정

#### 용어 정리

  - `조인포인트(Joinpoint)`
  
    - 클라이언트가 호출하는 모든 비즈니스 메소드.
    - 포인트컷 대상, 포인트컷 후보 라고도 부름.(조인포인트 중에서 포인트컷이 선택되기 때문)
    
  - `포인트컷(Pointcut)`
  
    - 필터링된 조인포인트.
    - 수많은 비즈니스 메소드 중에서 원하는 특정 메소드에서만 횡단 관심에 해당하는 공통 기능을 수행시키기 위해서 포인트컷 필요
    - 메소드가 포함된 클래스와 패키지, 메소드 시그니처까지 정확히 지정 가능
    
  - `어드바이스(Advice)`
  
    - 횡단 관심에 해당하는 공통 기능의 코드
    - 독립된 클래스의 메소드로 작성.
    - 어드바이스로 구현된 메소드가 언제 동작할지 스프링 설정 파일을 통해서 지정 가능.
    - 어드바이스 동작 시점 : 'before', 'after', 'after-returning', 'after-throwing', 'around'
    
  - `위빙(Weaving)`
  
    - 포인트컷으로 지정한 핵심 관심 메소드가 호출될 때, 어드바이스에 해당하는 횡단 관심 메소드가 삽입되는 과정
    - 비즈니스 메소드 수정 안하고도 횡단 관심에 해당하는 기능을 추가/변경 가능
    - 방식 : 컴파일타임 위빙, 로딩타임 위빙, 런타임 위빙. (스프링에서는 런타임 위빙 방식만 지원)
    
  - `애스팩트(Aspect) 또는 어드바이저(Advisor)`
  
    - 포인트컷 + 어드바이스
    - 어떤 포인트컷 메소드에 대해서 어떤 어드바이스 메소드를 실행할 지 결정. 이에 따라 AOP 동작 방식이 결정됨
    
#### AOP 엘리먼트

  - AOP 관련 설정을 xml 방식, 어노테이션 방식으로 지원.
  - \<aop:config\> 엘리먼트
  
    - AOP 설정에서의 루트 엘리먼트.
    - 하위에는 \<aop:pointcut\>, \<aop:aspect\>.
    
  - \<aop:pointcut\> 엘리먼트
  
    - 포인트컷 지정하기 위해 사용.
    - \<aop:config\>, \<aop:aspect\>의 자식 엘리먼트로 사용 가능. (\<aop:aspect\> 하위에 설정된 포인트컷은 해당 \<aop:aspect\>에서만 사용)
    - 여러 개 정의할 수 있고 고유 id 할당해서 애스팩트 설정 시 포인트컷 참조.
    
  - \<aop:aspect\> 엘리먼트
  
    - 핵심 관시에 해당하는 포인트컷 메소드와 횡단 관심에 해당하는 어드바이스 메소드 결합하기 위해 사용
    - 이에 따라 위빙 결과 달라짐. 중요!!
    
  - \<aop:advisor\> 엘리먼트
  
    - 애스팩트와 같은 기능.
    - 트랜잭션 설정 등 몇몇 특수한 경우는 어드바이저만 사용해야 함.
    - 어드바이스 객체의 아이디를 모르거나 메소드 이름 확인할 수 없으면 애스팩트 설정 불가.
    
    
#### 포인트컷 표현식

  - 리턴타입 지정
  | 표현식 | 설명 |
  | ------ | --- |
  | * | 모든 리턴타입 허용 |
  | void | 리턴타입이 void인 메소드 선택 |
  | !void | 리턴타입이 void가 아닌 메소드 선택 |
  
  - 패키지 지정
  | 표현식 | 설명 |
  | ----- | --- |
  | com.springbook.biz | 정확히 이 패키지만 |
  | com.springbook.biz.. | 이 패키지 이름으로 시작하는 모든 패키지 선택 |
  | com.springbook..impl | com.springbook으로 시작하고 마지막이 impl로 끝나는 패키지 |
  
  - 클래스 지정
  | 표현식 | 설명 |
  | --- | --- |
  | BoardServiceImpl | 정확히 이 클래스만 |
  | *Imple | Impl로 끝나는 클래스만 |
  | BoardService+ | '+'가 붙으면 해당 클래스로부터 파생된 모든 자식 클래스 선택. 인터페이스 뒤에 '+'가 붙으면 해당 인터페이스를 구현한 모든 클래스 |
  
  - 메소드 지정
  | 표현식 | 설명 |
  | --- | --- |
  | *(..) | 가장 기본 설정. 모든 메소드 |
  | get*(..) | 메소드 이름이 get으로 시작하는 모든 메소드 |
  
  - 매개변수 지정
  | 표현식 | 설명 |
  | --- | --- |
  | (..) | 매개변수 개수, 타입에 제약 없음 |
  | (*) | 반드시 1개의 매개변수 가지는 메소드만 |
  | (com.springbook.user.UserVO) | 매개변수로 UserVO 가지는 메소드만. 클래스의 패키지 경로가 반드시 포함되어야 함 |
  | (!com.springbook.user.UserVO) | 매개변수로 UserVO 안가지는 메소드만 |
  | (Integer, ..) | 1개 이상의 매개변수 가지고, 첫 매개변수 타입이 정수 |
  | (Integer, *) | 반드시 2개의 매개변수 가지고, 첫 매개변수 타입이 정수 |
  
  