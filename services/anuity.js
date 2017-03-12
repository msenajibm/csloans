var annuity = function(credit_sum, month, rate, rate_compare){
    this.credit_sum = credit_sum;
    this.month = month;
    this.rate = rate/100/12;
    this.rate_compare = rate_compare/100/12;
    this.credit = this.CalculateCredit();
    this.credit_compare = this.CalculateCreditCompare();
};
annuity.prototype.CalculateCredit = function(){
    return this.credit_sum * ((this.rate * Math.pow((1 + this.rate), this.month)) / (Math.pow((1 + this.rate), this.month) - 1));
};
annuity.prototype.CalculateCreditCompare = function(){
    return this.credit_sum * ((this.rate_compare * Math.pow((1 + this.rate_compare), this.month)) / (Math.pow((1 + this.rate_compare), this.month) - 1));
};
annuity.prototype.GetCredit = function(){
    return Math.round(this.credit);
};
annuity.prototype.GetCreditCompare = function(){
    return Math.round(this.credit_compare);
};
annuity.prototype.GetCreditDevide = function(){
    return Math.round(this.credit * this.month - this.credit_compare * this.month);
};

module.exports = annuity;