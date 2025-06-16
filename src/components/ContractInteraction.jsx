import React, { useEffect, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import yourAbi from '../abi/yourAbi.json'; // ✅ make sure to add your ABI here

const CONTRACT_ADDRESS = '0xYourContractAddress';

const ContractInteraction = () => {
  const client = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [value, setValue] = useState('');

  // 👀 Read value from contract
  useEffect(() => {
    const fetchValue = async () => {
      try {
        const result = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: yourAbi,
          functionName: 'yourFunction', // Replace with your function
        });
        setValue(result.toString());
      } catch (error) {
        console.error("Read Error:", error);
      }
    };

    fetchValue();
  }, [client]);

  // ✍️ Write to contract
  const handleWrite = async () => {
    try {
      await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: yourAbi,
        functionName: 'yourWriteFunction', // Replace with your function
        args: [/* replace with function arguments */],
      });
      alert('Transaction sent!');
    } catch (error) {
      console.error("Write Error:", error);
    }
  };

  return (
    <div>
      <h2>Contract Interaction</h2>
      <p>Current value: {value}</p>
      <button onClick={handleWrite}>Send Transaction</button>
    </div>
  );
};

export default ContractInteraction;
