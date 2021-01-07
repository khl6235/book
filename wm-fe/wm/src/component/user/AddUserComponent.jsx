import React, {Component} from 'react';
import ApiService from '../../ApiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddUserComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        }

        ApiService.addUser(user)
        .then(res => {
            this.setState({
                message: user.userName+'님이 성공적으로 등록되었습니다.'
            })
            console.log(this.state.message);
            this.props.history.push('/formlist');
        })
        .catch(err => {
            console.log('saveUser() Error!', err);
        });
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    <TextField type="text" placeholder="please input your username" name="userName"
                        fullWidth margin="normal" value={this.state.userName} onChange={this.onChange} />
                    
                    <TextField type="password" placeholder="please input your password" name="password"
                        fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />
                    
                    <TextField placeholder="please input your first name" name="firstName"
                        fullWidth margin="normal" value={this.state.firstName} onChange={this.onChange} />
                    
                    <TextField placeholder="please input your last name" name="lastName"
                        fullWidth margin="normal" value={this.state.lastName} onChange={this.onChange} />
                    
                    <TextField type="number" placeholder="please input your age" name="age"
                        fullWidth margin="normal" value={this.state.age} onChange={this.onChange} />
                    
                    <TextField type="number" placeholder="please input your salary" name="salary"
                        fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} />
                    

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default AddUserComponent;