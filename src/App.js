import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  // console.log(errors);

  const [modal, setModal] = useState(false);

  const password = useRef("");
  password.current = watch("password");
  // console.log(password);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  //Another method to reset the fields on submitting the form but put "formState" in line 9 near reset
  // useEffect(()=>{
  //   if(formState.isSubmitSuccessful){
  //     reset()
  //   }
  // }, [formState])

  const validation = {
    username: {
      required: {
        value: true,
        message: "Enter Username",
      },
    },
    phonenumber: {
      required: {
        value: true,
        message: "Enter Phonenumber",
      },
      pattern: {
        value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        message: "Enter valid phone number",
      },
    },
    email: {
      required: {
        value: true,
        message: "Enter Email",
      },
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Enter valid Email address",
      },
    },
    password: {
      required: {
        value: true,
        message: "Enter Password",
      },
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
    },
    confirm: {
      required: {
        value: true,
        message: "Confirm Password",
      },
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
      validate: (value) => {
        if (value !== password.current) {
          return "The passwords doesn't match";
        }
      },
    },
  };

  function refresh() {
    window.location.href = "./";
  }

  return (
    <div className="main">
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setModal(true);
        })}
      >
        <div className="input">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            {...register("username", validation.username)}
          />
          <br />
          <p className="errormsg">
            {errors.username && errors.username.message}
          </p>
        </div>
        <div className="input">
          <label htmlFor="phonenumber">Phonenumber</label>
          <br />
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="Enter Phone number"
            {...register("phonenumber", validation.phonenumber)}
          />
          <br />
          <p className="errormsg">
            {errors.phonenumber && errors.phonenumber.message}
          </p>
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter valid email"
            {...register("email", validation.email)}
          />
          <br />
          <p className="errormsg">{errors.email && errors.email.message}</p>
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            {...register("password", validation.password)}
          />
          <br />
          <p className="errormsg">
            {errors.password && errors.password.message}
          </p>
        </div>
        <div className="input">
          <label htmlFor="confirm">Confirm Password</label>
          <br />
          <input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm Password"
            {...register("confirm", validation.confirm)}
          />
          <br />
          <p className="errormsg">{errors.confirm && errors.confirm.message}</p>
          <br />
        </div>
        <div className="btnGroup">
          <div>
            <button type="submit" id="submitBtn" className="btns">
              Submit
            </button>
          </div>
          <div>
            <button type="reset" id="clearBtn" className="btns">
              Reset
            </button>
          </div>
        </div>
      </form>
      {modal && (
        <div className="modal">
          <div className="userDetails">
            <p>Your form has been submitted successfully</p>
            <button onClick={refresh} className="btns">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
