import React from 'react';
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

function App() {
  const account = useCurrentAccount();

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <ConnectButton />
      </nav>
      <section style={{ textAlign: 'center', marginTop: '20px' }}>
        {!account ? 'No wallet connected' : <OwnedObjects />}
      </section>
    </div>
  );
}

export function OwnedObjects() {
  const account = useCurrentAccount();
  if (!account) {
    throw new Error("No account is connected");
  }
  const { data, error, isLoading } = useSuiClientQuery('getOwnedObjects', { owner: account.address });

  if (isLoading) {
    return <p>Loading your owned objects...</p>;
  }

  if (error) {
    return <p>Error fetching owned objects: {error.message}</p>;
  }

  if (!data?.data?.length) {
    return <p>You don’t own any objects.</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.data.map((object) => (
        <li key={object.data?.objectId} style={{ padding: '5px 0' }}>
          {object.data?.objectId}
        </li>
      ))}
    </ul>
  );
}

export default App;
