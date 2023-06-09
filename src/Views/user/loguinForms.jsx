import { useState } from "react";
import style from "./loguinForms.module.css";

function validate(user) {
  let errors = {};

  if (!user) {
    errors.email = "enter your email";
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
    errors.email = "inavlid email";
  }
  if (user.email.length >= 35) {
    errors.email = "inavlid email";
  }
  if (!/\d/.test(user.password)) {
    errors.password = "password must contai a letter";
  }
  if (user.password.lendth < 6 || user.password.length > 10) {
    errors.password = "password must be between 6 and 10 characters";
  }

  return errors;
}

function LoguinForms({ login }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  function handlerChange(params) {
    setUser({
      ...user,
      [params.target.name]: params.target.value,
    });

    setErrors(
      validate({
        ...user,
        [params.target.name]: params.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault(user);

    if (!errors.email && !errors.password) {
      login(user);
    } else {
      alert("incorrect data");
    }
  }

  return (
    <div className={style.loginbox}>
      <div>
        <h1 className={style.title}>Fill Your User</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.userbox}>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handlerChange}
          />

          <label>Username</label>

          {errors.email && <span>{errors.email} </span>}
        </div>
        <div className={style.userbox}>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handlerChange}
          />

          <label>Password</label>

          {errors.password && <span>{errors.password} </span>}
        </div>
        <button className={style.btn} type="submit">
          LOGIN <span></span>
        </button>
      </form>
    </div>
  );
}

export default LoguinForms;

/*const navigate = useNavigate();
const [access, setAccess] = useState(false);
const EMAIL = 'ejemplo@gmail.com';
const PASSWORD = 'unaPassword';

function login(userData) {
   if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate('/home');
   }
}
 */
