export default function Valid (femail, ) {
    // const values = { email, userName,password }
    
    const errors = {}
     
    const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    if (femail.email === "") {
        errors.email = "email is required"
    }else if (!email_pattern.test(femail.email)) {
        errors.email = "Email does not match"
    }

   
    
    return errors
    }