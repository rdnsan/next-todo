import { Button, Col, Result, Row } from 'antd';
import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();

  return (
    <Row align="middle" justify="center" className="h-screen">
      <Col>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
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
