#!/bin/bash
cd /home/ubuntu/express-app
npm install
pm2 restart all || pm2 start app.js
