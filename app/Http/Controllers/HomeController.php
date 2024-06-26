<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function homebodyContent()
    {
        return view('homebody');
    }

    public function sobre()
    {
        return view('sobre');
    }

    // This method should be used to display the login form
    public function showLoginForm()
    {
        return view('login');
    }

    // This method should be used to handle the login submission
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // The intended method helps to redirect the user to their original destination
            return redirect()->intended('/dashboard'); // Assuming you have a route named '/dashboard'
        }

        // It's good practice to send back the input except for sensitive fields like passwords
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->withInput($request->except('password'));
    }
}
