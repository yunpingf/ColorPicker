var constants = new (function() {
    var MONOCHROMATIC = "Monochromatic";
    var COMPLEMENTARY = "Complementary";
    var SPLIT_COMPLEMENTARY = "SplitComplementary";
    var DOUBLE_COMPLEMENTARY = "DoubleComplementary";
    var ANALOGOUS = "Analogous";
    var TRIAD = "Triad";
    var ONE = "one";
    var TWO = "two";
    var THREE = "three";

    this.getMono = function() { return MONOCHROMATIC; };
    this.getComple = function() {return COMPLEMENTARY};
    this.getSplit = function() {return SPLIT_COMPLEMENTARY};
    this.getDouble = function() {return DOUBLE_COMPLEMENTARY};
    this.getAnalog = function() {return ANALOGOUS};
    this.getTriad = function() {return TRIAD};

    this.getOne = function() {return ONE};
    this.getTwo = function() {return TWO};
    this.getThree = function() {return THREE};
})();