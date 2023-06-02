import React, {useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress';

import useFetch from '../hooks/useFetch';

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {

    const gifUrl = useFetch({keyword});

    return (
        <div className='bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[450px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl
        '>
            <div className='flex flex-col items-center mt-3 w-full'>
                <div className='w-full mb-6 p-2'>
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target='_blanc' rel='noopener noreferre'>
                        <p className='text-white text-base'>From: {shortenAddress(addressFrom) }</p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target='_blanc' rel='noopener noreferre'>
                        <p className='text-white text-base'>To: {shortenAddress(addressTo) }</p>
                    </a>
                    <p className='text-white text-base'>Amount: {amount} </p>
                    {message &&
                    <>
                    <br />
                    <p className='text-white text-base'> Message: {message} </p>
                    </>
                    }
                </div>

                <img src={gifUrl || url} alt="gif" className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover' />
                    <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                        <p className='text-[#37c7da] font-bold'>Keyword: {timestamp} </p>
                    </div>
            </div>
        </div>
    )
}

const Transations = () => {

    const {connectedAccount, transactions} = useContext(TransactionContext)

    return (
        <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
           <div className='flex flex-col md:p-12 py-12 px-4 '>
                {connectedAccount ? (
                    <h3 className='text-white test-3xl text-center my-2'>Latest Transactions</h3>
                ) 
                : (
                    <h3 className='text-white test-3xl text-center my-2'>Connect your account to see transactions</h3>
                )}

                <div className='flex flex-wrap justify-center items-center mt-10'>
                    {transactions.reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction} />
                    ))}
                </div>
           </div>
        </div>
    );
}

export default Transations;
