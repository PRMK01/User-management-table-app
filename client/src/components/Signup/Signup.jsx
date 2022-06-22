import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
			const url = "https://user-management-table-app.herokuapp.com/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
  }

  return (
      <>
        <div className={styles.signup_container}>
          <div className={styles.signup_form_container}>
            <div className={styles.left}>
              <h1>Welcome Back</h1>
              <Link to="/login" >
                <button type='button' className={styles.white_btn} >
                  Sign in
                </button>
              </Link>
            </div>
            <div className={styles.right}>
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create account</h1>
                <input 
                  type='text'
                  placeholder='name'
                  name='name'
                  onChange={handleChange}
                  value={data.name}
                  required
                  className={styles.input}
                />
                                <input 
                  type='email'
                  placeholder='email'
                  name='email'
                  onChange={handleChange}
                  value={data.email}
                  required
                  className={styles.input}
                />
                                <input 
                  type='password'
                  placeholder='password'
                  name='password'
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type='submit' className={styles.green_btn} >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </>

  )
}

export default Signup