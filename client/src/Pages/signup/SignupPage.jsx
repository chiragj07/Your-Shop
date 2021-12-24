import React,{useState} from 'react'
import InputField from '../../component/InputFiled/InputField'
import '../SignIn/signStyles.css';
const SignupPage = ({history}) => {
    const [credentials, setCredentials] = useState({
        email :"", password: "", name:""
    })
    const [error, setError] = useState({emailError:'',passwordError:'', nameError:''})
    const handleChange = (e)=>{
            const {name, value} = e.target;
            // console.log(name,value);
            setCredentials({...credentials,[name]:value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(credentials);
        const res = await fetch('/register',{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json();
        console.log(data);
        if(data.status===400){
            const {email,password,name}=data.errors;
            setError({...error, emailError:email, passwordError: password,nameError: name})
        }
        else{
            alert("Registration is successfull");
            history.push('/signin')
        }
        
    }
    const {email, password,name} = credentials;
    

    return (
        <div className='sign-page'>
            <form action="POST">
                <h2>Sign Up</h2>    

                <InputField name='name' value={name} type='text' handleChange={handleChange} error={error.nameError}/>
                <InputField name='email' value={email} type='text' handleChange={handleChange} error={error.emailError} />
                <InputField name='password' value={password} type = "password" handleChange={handleChange} error={error.passwordError} />




                <button onClick={handleSubmit}>Sign IN</button>

            </form>
        </div>
    )
}

export default SignupPage
