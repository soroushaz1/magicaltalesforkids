const multer = require('multer');
const upload = multer({ dest: '/tmp/uploads' });

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    upload.single('file')(event, {}, (err) => {
      if (err) {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'File upload failed.' }),
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'File uploaded successfully!' }),
        });
      }
    });
  });
};
