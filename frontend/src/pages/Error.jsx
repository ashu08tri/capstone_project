import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  console.log(error)

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error) {
    title = error.status;
    message = error.data.message;
  }


  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;