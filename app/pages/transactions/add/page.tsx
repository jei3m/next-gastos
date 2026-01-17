import AddTransactionForm from '@/components/transactions/add-transaction-form';
import { Suspense } from 'react';

function AddTransactionPage() {
  return (
    <Suspense fallback={<></>}>
      <AddTransactionForm />
    </Suspense>
  );
}

export default AddTransactionPage;
