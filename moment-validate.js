(function () {
    angular.module('moment.validate')
        .constant('moment', moment)
        .constant('_', _)
        .directive('momentValidate', momentValidate);
        
    momentValidate.$inject = ['moment', '_'];
    function momentValidate(moment, _) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elm, attr, ngModel) {
                if (!ngModel) return;

                var defaultViewFormat = 'L',
                    defaultModelFormat = 'YYYY-MM-DD',
                    defaultType = 'moment';

                var viewFormat = attr.momentValidateViewFormat || defaultViewFormat,
                    modelFormat = attr.momentValidateModelFormat || defaultModelFormat,
                    type = attr.momentValidate || defaultType;

                ngModel.$formatters.push(function(value) {
                    if (!_.isUndefined(value)) {
                        if (type == 'moment' && moment.isMoment(value)) {
                            return value.format(viewFormat);
                        } else if (type == 'string') {
                            var m = moment(value, modelFormat, true);
                            if (m.isValid()) {
                                return m.format(viewFormat);
                            } else {
                                return value;
                            }
                        }
                    }
                });

                ngModel.$parsers.push(function(value) {
                    var m = moment(value, viewFormat, true);
                    if (type == 'moment') {
                        return m;
                    } else if (type == 'string') {
                        if (m.isValid()) {
                            return m.format(modelFormat);
                        } else {
                            return value;
                        }
                    }
                });

                ngModel.$validators.moment = function(value) {
                    if (!_.isUndefined(value)) {
                        if (type == 'moment' && moment.isMoment(value)) {
                            return value.isValid();
                        } else if (type == 'string') {
                            return moment(value, modelFormat, true).isValid();
                        }
                    }
                };
            }
        };
    };


})();