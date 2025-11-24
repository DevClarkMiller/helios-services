@Library('pipeline-lib') _

pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'FORCE_RUN',
            defaultValue: false,
            description: 'Forces run even if there are no changes'
        )
    }

    environment {
        USERNAME = credentials('vps-username')
        DOMAIN = credentials('vps-domain')
    }

    stages {
        stage('Determine Changes and run pipelines') {
            steps {
                checkout scm

                script {
                    def services = [
                        'helios.services.identity.api': 'services/helios.identity/helios.identity.api',
                        'helios.services.identity.client': 'services/helios.identity/helios.identity.client',
                        'helios.services.identity.data': 'services/helios.identity/helios.identity.data'
                    ]

                    def toTrigger = []
                    services.each { service, path ->
                        if (params.FORCE_RUN || checkMicroservice(path)) {
                            echo "Changes detected in ${service}, will trigger pipelines."
                            toTrigger << service // Add to the list
                        } else {
                            echo "No changes in ${service}, skipping."
                        }
                    }

                    if (toTrigger.isEmpty()) {
                        echo "No services changed. Nothing to trigger."
                    }

                    toTrigger.each { service -> 
                        echo "Triggering ${service}..."
                        build job: service,
                                parameters: [
                                    booleanParam(name: 'FORCE_RUN', value: params.FORCE_RUN)
                                ],
                                wait: true // set false for async
                        echo "${service} finished."
                    }
                }
            }
        }
    }
}
