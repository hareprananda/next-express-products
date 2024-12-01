class TestHelperClass {
  successRes = (data: Record<string, any>) => {
    return {
      status: 'success',
      statusCode: 200,
      data
    };
  };

  errorRes = (message: string, status: number) => {
    return {
      status: 'error',
      statusCode: status,
      message
    };
  };
}

const TestHelper = new TestHelperClass();
export default TestHelper;
