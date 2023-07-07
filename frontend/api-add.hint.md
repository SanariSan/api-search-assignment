## Steps to add new api call affecting store:

1. Create DTO (`servies/api/dto/x`)
2. Create service (`servies/api/x`)
3. Modify unexpected responses catch block if needed (`servies/api/classify-response`)
4. Create slice (`store/slices/x`)
5. Create nameAsync in slice (`store/slices/x`)
6. Create saga (`store/sagas/x`)
