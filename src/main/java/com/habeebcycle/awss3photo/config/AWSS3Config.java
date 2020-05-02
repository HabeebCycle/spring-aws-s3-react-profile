package com.habeebcycle.awss3photo.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSS3Config {

    private final String awsAccessKey;
    private final String awsAccessSecret;

    public AWSS3Config(@Value("${service.aws.access.key}") String awsAccessKey,
                       @Value("${service.aws.access.secret}") String awsAccessSecret) {
        this.awsAccessKey = awsAccessKey;
        this.awsAccessSecret = awsAccessSecret;
    }

    @Bean
    public AmazonS3 awsS3(){
        AWSCredentials awsCredentials = new BasicAWSCredentials(awsAccessKey, awsAccessSecret);
        return AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_2)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
