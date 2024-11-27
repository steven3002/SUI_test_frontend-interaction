import React from 'react';
import { signAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

export function SendSui() {
    const { mutateAsync: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

    function sendMessage() {
        const txb = new TransactionBlock();
        const coin = txb.splitCoins(txb.gas, [10]);
        txb.transferObjects([coin], 'Ox...');

        signAndExecuteTransactionBlock({
            transactionBlock: txb,
        }).then(async (result) => {
            alert('Sui sent successfully');
        });
    }

    return <button onClick={() => sendMessage()}>Send me Sui!</button>;
}
