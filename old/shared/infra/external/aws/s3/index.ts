import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_USER_ID,
  secretAccessKey: process.env.AWS_S3_USER_SECRET,
  region: process.env.AWS_S3_REGION,
});

interface IRequest {
  base64File: string;
  key: string;
  acl?: string;
}

interface IRespose {
  url: string;
  key: string;
  tag: string;
  bucket: string;
}

class UploadS3Files {
  public async run(data: IRequest): Promise<IRespose> {
    const fileStream = Buffer.from(
      data.base64File.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: data.key,
      Body: fileStream,
      ACL: data.acl || 'public-read',
    };

    const uploadedFile = await s3.upload(params).promise();

    return {
      url: uploadedFile.Location,
      key: uploadedFile.Key,
      bucket: uploadedFile.Bucket,
      tag: uploadedFile.ETag,
    };
  }
}

export default UploadS3Files;
