declare module "adwords/auth" {
    export class AdwordsAuth {
        credentials: any;
        oauth2Client: any;
        /**
         * @inheritDoc
         */
        constructor(credentials: any, redirectUrl?: any);
        /**
         * Generates an Authentication Url
         * @access public
         * @return {string} a URL to redirect to
         */
        generateAuthenticationUrl(): any;
        /**
         * Gets an access+refresh token from an authorization code
         * @access public
         * @param code {string} a coded string
         * @param callback {function}
         */
        getAccessTokenFromAuthorizationCode(code: any, callback: any): void;
        /**
         * Refreshes the access token
         * @access public
         * @param refreshToken {string} a refresh token
         * @param callback {function} a function with error and the new access token
         */
        refreshAccessToken(refreshToken: any, callback: any): void;
    }
}
declare module "services" {
    export const SERVICES: {
        'AccountLabelService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdCustomizerFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupAdService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupBidModifierService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupCriterionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupExtensionSettingService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdGroupService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdParamService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'AdwordsUserListService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'BatchJobService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'BiddingStrategyService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'BudgetOrderService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'BudgetService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignGroupPerformanceTargetService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignBidModifierService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignCriterionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignExtensionSettingService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CampaignSharedSetService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'ConstantDataService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'ConversionTrackerService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CustomerExtensionSettingService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CustomerFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CustomerNegativeCriterionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CustomerService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'CustomerSyncService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'DataService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'DraftAsyncErrorService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'DraftService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'FeedItemService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'FeedItemTargetService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'FeedMappingService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'FeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'LabelService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'LocationCriterionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'ManagedCustomerService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'MediaService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'OfflineCallConversionFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'OfflineConversionFeedService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'OfflineDataUploadService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'ReportDefinitionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'SharedCriterionService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'SharedSetService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'TargetingIdeaService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'TrafficEstimatorService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'TrialAsyncErrorService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
        'TrialService': {
            'xmlns': string;
            'wsdl': string;
            'methods': string[];
        };
    };
}
declare module "adwords/constants" {
    /**
     * The values here are taken from the PHP Google Adwords Library
     * https://github.com/googleads/googleads-php-lib
     */
    export const CONSTANTS: {
        RECOMMENDED_PAGE_SIZE: number;
        MICROS_PER_DOLLAR: number;
        MICRO_DEGREES_PER_DEGREE: number;
        OAUTH_ERROR: string;
        DEFAULT_ADWORDS_VERSION: string;
        DATE_RANGE_TYPES: {
            CUSTOM_DATE: string;
            TODAY: string;
            YESTERDAY: string;
            LAST_7_DAYS: string;
            THIS_WEEK_SUN_TODAY: string;
            THIS_WEEK_MON_TODAY: string;
            LAST_WEEK: string;
            LAST_14_DAYS: string;
            LAST_30_DAYS: string;
            LAST_BUSINESS_WEEK: string;
            LAST_WEEK_SUN_SAT: string;
            THIS_MONTH: string;
        };
    };
}
declare module "lib/request-parser" {
    export class RequestParser {
        /**
         * Converts the Adwords Request to a valid request
         * Needed due to adwords WSDL not being 100% accurate
         * @access public
         * @param request {object} the request object for adwords
         * @return {object} the request object formatted correctly
         */
        static convertToValidAdwordsRequest(request: any): any;
        /**
         * Converts Attribute Types for the xsi:type field
         * @access private
         * @param object the request body
         * @return {object}
         */
        static convertAttributeTypes(obj: any): any;
    }
}
declare module "adwords/service" {
    export class AdwordsService {
        credentials: any;
        auth: any;
        serviceDescriptor: any;
        client: any;
        clientDetails: any;
        clientCustomerId: any;
        /**
         * @inheritDoc
         */
        constructor(credentials: any, serviceDescriptor: any);
        /**
         * Attaches a function to the current service object
         * This is sort of like using the "Proxy.create" method
         * but have to wait till it is finalized in ES6
         * @access protected
         * @param methods {array} an array of string method names
         */
        registerServiceDescriptorMethods(methods: any): void;
        /**
         * Helper method to call the service properly
         * @access private
         * @param method {string} the method name for the service
         * @return {function} returns a service call method to invoke.
         */
        callServiceMethod(method: any): any;
        /**
         * The bread and butter method that calls the adwords service.
         * This method should never be called directly
         * @access protected
         * @param method {string} the method to call e.g. `get` or `mutate`
         * @param payload {object} the request object to send to adwords
         * @param callback {function}
         * @param shouldRetry {boolean} should retry if there is an oAuth error
         */
        callService(method: any, payload: any, callback: any, shouldRetry: any): void;
        /**
         * Parses the response from adwords
         * @access protected
         * @param callback
         * @return {function} a function that returns a parsed response
         */
        parseResponse(callback: any): (error: any, response: any) => void;
        /**
         * Helper method to get the SOAP client
         * @access protected
         * @param callback {function} returns a function with error, soapclient and meta data
         */
        getClient(callback: any): any;
        /**
         * Gets an access token
         * @access protected
         * @param callback {function}
         */
        getAccessToken(callback: any): any;
        /**
         * Helper method to log all the soap calls
         * @access private
         */
        log(subject: any, log: any): void;
    }
}
declare module "adwords/user" {
    export class AdwordsUser {
        credentials: any;
        /**
         * @inheritDoc
         */
        constructor(obj: any);
        /**
         * Returns an Api Service Endpoint
         * @access public
         * @param service {string} the name of the service to load
         * @param adwordsversion {string} the adwords version, defaults to 201609
         * @return {AdwordsService} An adwords service object to call methods from
         */
        getService(service: any, adwordsVersion: any): any;
        /**
         * Populates the service descriptor with dynamic values
         * @access protected
         * @param serviceDescriptor {object} the obejct from the service descriptor object
         * @param adwordsVersion {string} the adwords version to replace inside the service descriptors
         * @return {object} a new service descriptor with the proper versioning
         */
        populateServiceDescriptor(serviceDescriptor: any, adwordsVersion: any): any;
    }
}
declare module "adwords/report-builder" {
    export class AdwordsReportBuilder {
        /**
         * Builds a report
         * @access public
         * @param report {object}
         */
        buildReport(report: any): any;
        /**
         * Builds the fields list in the selector. This function modifies the xmlelement
         * @param fields {array} Array of field names
         * @access private
         * @return null
         */
        buildSelector(xml: any, report: any): void;
        /**
         * Builds the fields
         * @access private
         * @param selector {xml}
         * @param fields {array}
         */
        buildFields(selector: any, fields: any): void;
        /**
         * Builds the date range
         * @access private
         * @param selector {xml}
         * @param startDate {date}
         * @param endDate {date}
         */
        buildDateRange(selector: any, startDate: any, endDate: any): void;
        /**
         * Builds the Filters
         * @param selector {xml}
         * @param filters {array} an array of filters
         */
        buildFilters(selector: any, filters: any): void;
        /**
         * Determines if a report has a date range filter
         * @access public
         * @
         */
        hasDateRangeFilter(report: any): boolean;
    }
}
declare module "adwords/report" {
    export class AdwordsReport {
        auth: any;
        credentials: any;
        /**
         * @inheritDoc
         */
        constructor(credentials: any);
        /**
         * Gets a report from the api
         * @access public
         * @param apiVersion {string} the version in the api
         * @param report {object} the report object
         * @param callback {function}
         * @param retryRequest {boolean} used to determine if we need to retry the request
         *                               for internal use only
         */
        getReport(apiVersion: any, report: any, callback: any, retryRequest: any): void;
        /**
         * Determines if the body contains an error message
         * @param report {object} the report object
         * @param body {string} the body string
         * @return {boolean}
         */
        reportBodyContainsError(report: any, body: any): boolean;
        /**
         * Gets the headers for the request
         * @param additionalHeaders {object} gets additional headers
         */
        getHeaders(additionalHeaders: any, callback: any): void;
        /**
         * Gets an access token
         * @access protected
         * @param callback {function}
         */
        getAccessToken(callback: any): any;
        /**
         * Builds the report body
         * @access protected
         * @param report {object} the adwords report
         * @return {object} a formated formData
         */
        buildReportBody(report: any): any;
    }
}
declare module "index" {
}
