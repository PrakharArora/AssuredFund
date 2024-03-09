import crypto from 'crypto';
import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();


const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your frontend domain
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const newPayment = async (req, res) => {
    try {
        const { transactionId, MUID, name, amount, number } = req.body;
        const data = {
            merchantId: 'PGTESTPAYUAT',
            merchantTransactionId: transactionId,
            merchantUserId: MUID,
            name: name,
            amount: amount * 100,
            redirectUrl: 'https://localhost:5173/bookings',
            redirectMode: 'POST',
            mobileNumber: number,
            paymentInstrument: {
                type: 'PAY_PAGE',
            },
        };


        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const options = {
            method: 'POST',
            url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', // Remove the space at the beginning
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
            data: {
                request: payloadMain,
            },
            withCredentials: true, // Add this line to include credentials
        };

        const response = await axios(options);
        console.log(response.data);
        return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
};

const checkStatus = async (req, res) => {
    try {
        const { transactionId, merchantId } = req.body;
        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantId}/${transactionId}` + '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
            withCredentials: true, // Add this line to include credentials
        };

        const response = await axios(options);
        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
        console.log(`Redirect URL: ${redirectUrl}`);
        return res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
};
export { newPayment, checkStatus };