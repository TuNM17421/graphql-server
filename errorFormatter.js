const { GraphQLError } = require('graphql');

function formatError(formattedError, error) {
  // Lấy mã trạng thái HTTP từ extensions của lỗi
  const httpStatus = error?.extensions?.http?.status;

  // Nếu có, thiết lập nó vào phản hồi của apollo-server
  if (httpStatus) {
    // Apollo Server v4 không cho phép sửa đổi trực tiếp.
    // Thay vào đó, chúng ta sẽ dựa vào cách tiếp cận plugin hoặc middleware của express.
    // Tuy nhiên, với apollo-server-express v3, chúng ta có thể làm cách này
    // nhưng cách tốt nhất là để express middleware xử lý.
    // Đoạn code này chỉ để minh họa.
    // Trong thực tế, bạn sẽ cần một express error middleware.

    // Với Apollo Server 4, bạn sẽ ném lỗi từ plugin hoặc context
    // và để một framework middleware (như của Express) bắt lỗi đó.

    // Tuy nhiên, cách làm đúng với apollo-server-express v3 là:
    if (formattedError.extensions) {
      formattedError.extensions.http = { status: httpStatus };
    }
  }

  // Xóa stacktrace trong môi trường production để bảo mật
  // if (process.env.NODE_ENV === 'production') {
  //   delete formattedError.extensions.exception;
  // }

  return formattedError;
}

module.exports = { formatError };
