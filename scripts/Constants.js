var constants = new (function() {
    var MONOCHROMATIC = "Monochromatic";
    var COMPLEMENTARY = "Complementary";
    var SPLIT_COMPLEMENTARY = "SplitComplementary";
    var DOUBLE_COMPLEMENTARY = "DoubleComplementary";
    var ANALOGOUS = "Analogous";
    var TRIAD = "Triad";

    this.getMono = function() { return MONOCHROMATIC; };
    this.getComple = function() {return COMPLEMENTARY};
    this.getSplit = function() {return SPLIT_COMPLEMENTARY};
    this.getDouble = function() {return DOUBLE_COMPLEMENTARY};
    this.getAnalog = function() {return ANALOGOUS};
    this.getTriad = function() {return TRIAD};
})();