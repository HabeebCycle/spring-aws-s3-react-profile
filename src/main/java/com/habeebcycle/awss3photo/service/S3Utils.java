package com.habeebcycle.awss3photo.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public void save(String path, String fileName,
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
            throw new IllegalStateException("Failed to store file to s3", ase);
        }
    }
}
