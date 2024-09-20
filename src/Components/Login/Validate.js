export default function Validate (femail, fpassword, ) {
    // const values = { email, userName,password }
    
    const errors = {}
     
    const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    if (femail.email === "") {
        errors.email = "email is required"
    }else if (!email_pattern.test(femail.email)) {
        errors.email = "Email does not match"
    }

    if (fpassword.password === "") {
        errors.password = "Password is required";
      } else if (fpassword.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
      } else if (!/[a-z]/.test(fpassword.password)) {
       errors.password = "Password must contain at least one lowercase letter.";
      } else if (!/[A-Z]/.test(fpassword.password)) {
       errors.password = "Password must contain at least one uppercase letter.";
      } else if (!/\d/.test(fpassword.password)) {
       errors.password = "Password must contain at least one digit";
      }
       else if (!/[@$!%*?&]/.test(fpassword.password)) {
       errors.password = "Password must contain at least one special character.";
      }
    
    return errors
    }