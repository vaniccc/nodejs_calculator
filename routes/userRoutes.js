import express from 'express';
// import fs from 'fs';
const router = express.Router();
import bcrypt from 'bcrypt';
import validator from 'validator';

import { createUser, getUserByUsername, getAllUserRows } from '../db/db.js';

router.use(express.urlencoded({ extended: true }));

// ###############################################################################

router.post('/signup', async (req, res) => {
    
    const { username, password, confirmPassword} = req.body;

    //const errMsg = document.getElementById('errMsg');

    try {

        if(!validator.isLength(username, 4)) {
            console.error("Benutzername muss mindestens 4 Zeichen betragen!");
            //errMsg.innerHTML = "Der Benutzername muss mindestens 4 Zeichen beinhalten!";
        }

        else if(!validator.isLength(password, 8)){
            console.error("Passwort muss mindestens 8 Zeichen betragen!");
            //errMsg.innerHTML = "Das Passwort muss mindestens 8 Zeichen beinhalten!";
        }
        else if(!validator.equals(password, confirmPassword)) {
            console.error("Passwörter stimmen nicht überein!");
            //errMsg.innerHTML = "Die Passwörter stimmen nicht überein!";
        }
        
        else {
            try {
                const checkUsers = getUserByUsername(username);

                console.log('UserCheck: ');
                console.log(checkUsers);

                if(!checkUsers) {
                    try {
                        const hashedPassword = (await bcrypt.hash(password, 10)).toString();

                        createUser(username, hashedPassword);

                        res.redirect('http://localhost:3000/calculator');

                    } catch (e) {
                        console.error('Create User Error: ' + e);
                    }
                    
                } else {
                    console.log('Der Benutzername ist bereits vergeben');
                }
            } catch(e) {
                console.error('Fehler beim UserCheck: ' + e);
            }
        }

        // Output all User Rows
        // getAllUserRows();
       
    } catch (e) {
        console.error(e);
    }
});

// ###############################################################################

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    console.log('Username and Password Output: ' + username, password);

    try {
        const user = getUserByUsername(username);

        if(user) {
            console.log(user);

            const comparePassword = await bcrypt.compare(password, user.password_hash);

            if(!comparePassword) {
                console.log('Anmeldedaten falsch!');
                return res.status(400).json({ error: "Anmeldedaten falsch."});
            } else {
                console.log('Anmeldedaten richtig');
                res.redirect('http://localhost:3000/calculator');
                res.status(200).json({ message: "Login erfolgreich"});
            }
        } else {
            console.log('Anmeldedaten falsch!');
            return res.status(400).json({ error: "Anmeldedaten falsch."});
        }
    } catch (e) {
        console.error('Login Fehler: ' + e);
    }
});

export default router;