import dotenv from 'dotenv';
import app from './app';
import socket from './socket';

dotenv.config();

socket();

app.listen(process.env.PORT || 3333);
