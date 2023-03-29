/* import ReCAPTCHA from "react-google-recaptcha" */
import { useRef, useState } from "react";
import axios from "axios";
import Reaptcha from "reaptcha";

const Form = () => {
  let captcha = useRef(null);

  const zero = 0;

  /*     const handleSubmit = async (e) =>{
        e.preventDefault();
        const inputVal = e.target[0].value;

        const token = captchaRef.current.getValue();
        console.log(token);
        captchaRef.current.reset();

        await axios.post("http://localhost:2000/post", {inputVal,token})
        .then(res =>  console.log(res))
        .catch((error) => {
        console.log("Didnt work");
        })
    } */

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToken = () => {
    captcha.current.getResponse().then((res) => {
      console.log(res);
      setCaptchaToken(res);
    });

    console.log();
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputVal = await e.target[0].value;
    console.log(inputVal);

    await axios
      .post("http://localhost:2000/post", { inputVal, captchaToken })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log("Didnt work");
      });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="input" />
        <Reaptcha
          ref={captcha}
          sitekey={process.env.REACT_APP_SITE_KEY}
          onVerify={handleToken}
          onLoad={() => handleLoad}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
