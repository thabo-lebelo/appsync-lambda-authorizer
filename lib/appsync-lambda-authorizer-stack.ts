import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class AppsyncLambdaAuthorizerStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "thabolebeloVPC", {
            maxAzs: 2,
            natGateways: 1,
            subnetConfiguration: [
                {
                    name: 'private-subnet-1',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
                    cidrMask: 24,
                },
                {
                    name: 'public-subnet-1',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
            ],
        });

        const lambdaFunction = new lambda.Function(this, 'lambda-function', {
            runtime: lambda.Runtime.NODEJS_14_X,
            vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
            },
            memorySize: 1024,
            timeout: Duration.seconds(300),
            handler: 'index.handler',
            functionName: 'AppSyncAuthorizer',
            code: lambda.Code.fromAsset(path.join(__dirname, '/../src/')),
        });
    }
}
