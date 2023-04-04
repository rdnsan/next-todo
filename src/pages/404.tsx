import { Button, Col, Result, Row } from 'antd';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <Row align="middle" justify="center" className="h-screen">
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => {
                router.push('/');
              }}
            >
              Back to Home
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
