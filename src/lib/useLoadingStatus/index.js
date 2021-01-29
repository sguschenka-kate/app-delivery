import { useState } from 'react';
import { Loader } from '../../components/Loader';

function useLoadingStatus(loading) {
  const [isLoading, setLoading] = useState(true);

  if (loading) {
    <Loader />
  }

  setLoading(false)

  return isLoading
}

export {
  useLoadingStatus
}