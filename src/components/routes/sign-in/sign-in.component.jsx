import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../../utils/firebase/firebase.util'

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };
    
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign in With google</button>
        </div>
    );
};

export default SignIn;