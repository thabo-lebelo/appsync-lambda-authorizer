exports.handler = async (event) => {
    console.log(`event >`, JSON.stringify(event, null, 2))
    const {
        authorizationToken,
        requestContext: { apiId, accountId, requestId },
    } = event
    const response = {
        isAuthorized: authorizationToken === 'thabolebelo',
        ttlOverride: 10,
    }
    console.log(`API_ID = `, apiId)
    console.log(`ACCOUNT_ID = `, accountId)
    console.log(`REQUEST_ID = `, requestId)
    console.log(`AUTH_TOKEN = `, authorizationToken)
    return response
}
