'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const createAccount = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setPassword(''); // Clear password field
      setConfirmPassword(''); // Clear confirm password field
      return;
    }

    setErrorMessage("");
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          address: formData.get('address'),
          tele: formData.get('teleNum'),
          email: formData.get('email'),
          password: formData.get('password'),

        }),
        headers: {
          'Content-Type': 'application/json',
        },

      });
      

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create account');
      }

      if (responseData.message === 'success') {
        router.push('/Login');
        toast.success('Signed up successfully!');
      } else {
        throw new Error(responseData.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error.message || 'An unexpected error occurred');
      setErrorMessage(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <main>
      <div className="relative flex justify-center my-8">
        <div style={{ minWidth: "40%" }}>
          <div className="flex  shadow-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link href="/">
                <h1 className="text-3xl font-bold text-center text-gray-700">
                  <span className="text-green-400">La</span>-<span className="text-green-200">Festo</span>
                </h1>
              </Link>
              <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
                Create a new account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={createAccount}>
                <div>
                  <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-600">
                    Name
                  </label>
                  <div className="mt-2">
                    <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-md font-medium leading-6 text-gray-600">
                    Address
                  </label>
                  <div className="mt-2">
                    <input id="address" name="address" type="address" autoComplete="address" required className="block w-full rounded-md border-0 py-1.5 px-2
          text-black shadow-sm ring-1 ring-inset ring-green-400 
          placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 
          sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-600">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 
        text-black shadow-sm ring-1 ring-inset ring-green-400 px-2
        placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 
        sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <label htmlFor="teleNum" className="block text-md font-medium leading-6 text-gray-600">
                    Telephone
                  </label>
                  <div className="mt-2">
                    <input id="teleNum" name="teleNum" type="telephone" autoComplete="teleNum" required className="block w-full rounded-md border-0 py-1.5 px-2
          text-black shadow-sm ring-1 ring-inset ring-green-400 
          placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 
          sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-600">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={handlePasswordChange} required className="block w-full rounded-md border-0 py-1.5 text-black
        shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-black px-2
        focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-600">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required className="block w-full rounded-md border-0 py-1.5 
        text-black shadow-sm ring-1 ring-inset ring-green-400 px-2
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 
        sm:text-sm sm:leading-6" />
                  </div>
                </div>
                {errorMessage && <p className='text-red-600 text-sm'>{errorMessage}</p>}
                <div className=''>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href={'/Login'}>
                  <span className="font-semibold leading-6 text-green-600 hover:text-green-500 cursor-pointer">
                    Sign In
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
