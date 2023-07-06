import RazorpayCheckout from 'react-native-razorpay';
import { addAmountToWalletCallback } from '../services/wallet.service';

export const handleRedirect = async (obj, orderId) => {
    try {
        console.log(JSON.stringify(obj, null, 2));
        console.log(JSON.stringify(obj, null, 2), 'object');
        let tempObj = obj;
        let OrderId = orderId;
        var options = {
            description: 'Order',
            image: 'https:i.imgur.com/3g7nmJC.png',
            currency: tempObj.currency,
            key: 'rzp_test_jOl57g4TNamtFW',
            amount: tempObj.amount,
            name: 'Wallet',
            order_id: tempObj.id,
         //   Replace this with an order_id created using Orders API.
            theme: {
                color: '#F84B4B'
            },
        };
        RazorpayCheckout.open(options).then(async data => {
          //  handle success
            let Obj = { ...data,
                amount: tempObj.amount,
            };
            await handlePaymentCallBack(Obj, OrderId);
        }).catch(error => {
          //  handle failure console.error(error);
            console.log(typeof error.description);
            if (error?.error ?.description) {
                alert(error ?.error ?.description);
            } else {
                alert(`Error: ${error.code} | ${error.description}`);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
export const handlePaymentCallBack = async (obj, id) => {
    try {
        const serialize = function(obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            return str.join('&');
        };
        let {
            data: res,
            status: statusCode
        } = await addAmountToWalletCallback(id,serialize(obj));
        if (statusCode == 200 || statusCode == 304) {
            alert(res.message);
            props.navigation.goBack();
            props.navigation.navigate('Drawer', {
                screen: 'OrderHistory'
            })
        }
    } catch (error) {
        //console.error(error);
    }
};

export const createPaymentOrder = async (options) => {
    try {
      let orderObj = await instance.orders.create(options);
      return orderObj;
    } catch (error) {
      console.error(error);
      return error;
    }
  };