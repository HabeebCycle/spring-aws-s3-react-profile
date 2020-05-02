package com.habeebcycle.awss3photo.S3Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
public class S3Utils {

    private final AmazonS3 awsS3;
    private final String photoBucket;

    public S3Utils(AmazonS3 awsS3,
                   @Value("${service.aws.s3.bucket.photo}") String photoBucket) {
        this.awsS3 = awsS3;
        this.photoBucket = photoBucket;
    }

    public void saveToS3(String path, String fileName,
                     Optional<Map<String, String>> optMetadata, InputStream inputStream){

        ObjectMetadata metadata = new ObjectMetadata();
        optMetadata.ifPresent(data ->{
            if(!data.isEmpty()){
                data.forEach(metadata::addUserMetadata);
            }
        });

        try {
            awsS3.putObject(path, fileName, inputStream, metadata);
        }catch (AmazonServiceException ase){
            throw new IllegalStateException("Failed to put file to s3", ase);
        }
    }

    public byte[] getFromS3(String path, String key) {
        try {
            S3Object object = awsS3.getObject(path, key);
            return IOUtils.toByteArray(object.getObjectContent());
        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to get file from s3", e);
        }
    }

    public void deleteFromS3(String path, String key){
        try {
            awsS3.deleteObject(path, key);
        } catch (AmazonServiceException ase){
            throw new IllegalStateException("Failed to delete file from s3", ase);
        }
    }

    public String getPhotoBucket(){
        return photoBucket;
    }
}
