var TagiUI = TagiUI || {};

TagiUI.Toggler = function() {
    this.$el = null;
    this.$target = null;
    this.defaults = {
        eventTrigger: 'click'
    }
    this.options;
    this.booleans = [
        ["true", "false"],
        ["expanded", "collapsed"],
        ["visible", "hidden"]
    ];
};

TagiUI.Toggler.prototype.init = function(element,options) {
    var self = this, meta;

    this.$el = $(element);

    if(typeof this.$el.data('toggler') !== 'undefined'){
        meta = this.$el.data('toggler').options;
    }

    this.options = $.extend(this.defaults, options, meta);

    this.findTarget();

    if(this.options.eventTrigger) {
        this.$el.on(this.options.eventTrigger, function(e) {

            if(!self.$el[0].hash) {
                e.preventDefault();
            }

            self.toggleClass();
            self.toggleAttribute();
        });
    }

    this.$el.data('toggleme', this);
    return this;
};

// Cache the target element(s)
TagiUI.Toggler.prototype.findTarget = function() {
    var selector = null, $target = null, $scope;

    if (this.options.target) {
        selector = this.options.target; // target is specified by data-attribute
    } else if (this.$el[0].hash) {
        selector = this.$el[0].hash; // target is specified by href
    }

    if(selector && selector !== '#' && selector !== 'self') {
        if(typeof this.options.scope !== 'undefined') {
            $scope = this.$el.closest(this.options.scope);
        } else {
            $scope = $(document);
        }
        $target = $scope.find(selector);
    }

    if($target && $target.length > 0) {
        this.$target = $target;
    } else {
        this.$target = this.$el; // element and target are the same
    }
};

// Add/remove the specified class(es)
TagiUI.Toggler.prototype.toggleClass = function() {
    if( this.$target && (typeof this.options["class"] !== "undefined") ) {
        this.$target.toggleClass(this.options["class"]);
    }
};

// Toggle the values on the specified attributes
TagiUI.Toggler.prototype.toggleAttribute = function() {
    var self = this;
    if( this.$target && typeof this.options.attribute !== "undefined" ){
        var attributes = this.options.attribute;

        if(typeof attributes === 'string') {
            attributes = [attributes];
        }

        $.each(attributes, function(i, attribute) {
            if(self.$target.attr(attribute)){
                var oldval = self.$target.attr(attribute);
                self.$target.attr(attribute, function(i, oldval) {
                    return self.toggleValue(oldval);
                });
            }
        });
    }
};

TagiUI.Toggler.prototype.toggleValue = function(v) {
    for(var i = 0; i < this.booleans.length; i++) {
        if( v === this.booleans[i][0] || v === this.booleans[i][1] ){
            return v === this.booleans[i][0] ? this.booleans[i][1] : this.booleans[i][0];
        }
    }
};
var TagiUI = TagiUI || {};

TagiUI.Accordion = function() {
    this.$el = null;
    this.$collapsibles = null;
    this.$triggers = null;
    this._explicitPath;
    this.defaults = {
        trigger: '[data-accordion-trigger]',
        collapsible: '[data-accordion-collapsible]',
        animation: 'slideToggle',
        speed: 0,
        easing: 'easeInQuad',
        simultaneously: true
    };
    this.toggleOptions = {
        eventTrigger: null,
        target: 'self',
        attribute: [
            "aria-hidden",
            "aria-visible",
            "aria-expanded",
            "aria-selected",
            "data-accordion-panel"
        ]
    }
};

TagiUI.Accordion.prototype.init = function(element, options) {
    var self = this, meta, triggerSelector;

    this.$el = $(element);

    meta = this.$el.data('accordion').options;
    this.options = $.extend(this.defaults, options, meta);

    this.findTriggers();
    this.findCollapsibles();
    this.hideCollapsibles();

    // restrict to current level
    var triggerSelector = this.getExplicitPath() + this.options.trigger;
    this.$el.on('click', triggerSelector, function(e) {
        e.preventDefault();
        self.toggleElements(this);
    });

    this.$el.data('accordion', this);

    return this;
};

// Because there might be nested accordions we need to restrict the selection to the current level
// eg: ' > li > '
TagiUI.Accordion.prototype.getExplicitPath = function() {
    if(typeof this._explicitPath === 'undefined') {
        var path = ' > ',
            $el = this.$el.find(this.options.collapsible + ':first'),
            $parents = this.findParents($el);

        $parents.each(function() {
            path = ' > ' + $(this).prop("tagName") + path;
        });

        this._explicitPath = path;
    }

    return this._explicitPath;
};

// Get all wrappers of trigger/collapsible up to the accordion
TagiUI.Accordion.prototype.findParents = function($item) {
    // get parents from element up to the accordion
    var $parents = $item.parentsUntil(this.$el);
    return $parents;
};

// Cache all collapsibles
TagiUI.Accordion.prototype.findCollapsibles = function() {
    var $collapsibles, selector;

    selector = this.getExplicitPath() + this.options.collapsible;
    $collapsibles = this.$el.find(selector);

    if($collapsibles.length > 0) {
        this.$collapsibles = $collapsibles;
    }
};

// Cache all triggers
TagiUI.Accordion.prototype.findTriggers = function() {
    var $triggers, selector;

    selector = this.getExplicitPath() + this.options.trigger;
    $triggers = this.$el.find(selector);

    if($triggers.length > 0) {
        this.$triggers = $triggers;
    }
};

// Hide all collapsibles by aria-attribute
TagiUI.Accordion.prototype.hideCollapsibles = function() {
    if(this.$collapsibles) {
        this.$collapsibles.not('[aria-expanded="true"]').hide();
    }
};

TagiUI.Accordion.prototype.toggleElements = function(trigger) {
    var self = this,
        $target = $(trigger).next(),
        $triggers = $(trigger).add(this.$triggers.filter('[aria-selected="true"]')),
        selector = this.getExplicitPath() + this.options.collapsible,
        $expanded = this.$el.find(selector).filter('[aria-expanded=true]');

    $triggers.each(function() {
        self.toggleAttributes(this);
    });

    var speed = this.options.animation === 'slideToggle' ? this.options.speed : 0;

    if(this.options.simultaneously) {
        $expanded.add($target)[this.options.animation](speed, this.options.easing, function() {
            self.toggleAttributes(this);
            self.toggleParentsAttributes(this);
        });
    } else {
        $expanded[this.options.animation](speed, this.options.easing, function() {
            self.toggleAttributes(this);
            self.toggleParentsAttributes(this);

            $target[self.options.animation](speed, self.options.easing, function() {
                self.toggleAttributes(this);
                self.toggleParentsAttributes(this);

            });
        });
    }
};

// toggle attributes on the parent elements, eg:
// [data-accordion-panel="true/false"]
TagiUI.Accordion.prototype.toggleParentsAttributes = function(el) {
    var self = this,
        $parents = self.findParents($(el));

    if($parents.length > 0) {
        $parents.each(function() {
            self.toggleAttributes(this);
        });
    }
};

// Assign the Toggler module to each element
// and call the toggle method
TagiUI.Accordion.prototype.toggleAttributes = function(el) {
    if(!$(el).data('toggleme')){
        var instance = new TagiUI.Toggler().init(el, this.toggleOptions);
    }
    $(el).data('toggleme').toggleAttribute();
};
var TagiUI = TagiUI || {};

TagiUI.Tabs = function() {
    this.$el = null;
    this.$tabPanels = null;
    this.$triggers = null;
    this.toggleOptions = {
        eventTrigger: null,
        target: 'self',
        attribute: [
            "aria-hidden",
            "aria-visible",
            "aria-expanded",
            "aria-selected"
        ]
    };
};

TagiUI.Tabs.prototype.init = function(element, options) {
    var self = this, meta, triggerSelector;

    this.$el = $(element);

    meta = this.$el.data('tabs').options;
    this.options = $.extend(this.defaults, options, meta);

    this.findTriggers();
    this.findTabPanels();


    // restrict to current level
    this.$el.on('click', 'a', function(e) {
        e.preventDefault();
        self.toggleElements(this);
    });

    this.initTabPanels();

    this.$el.data('tabs', this);

    return this;
};

// Cache all triggers
TagiUI.Tabs.prototype.findTriggers = function() {
    var $triggers = [];

    $triggers = this.$el.find('a');
    if($triggers.length > 0) {
        this.$triggers = $triggers;
    }
};

// Cache all tabPanels
TagiUI.Tabs.prototype.findTabPanels = function() {
    var tabPanels = [], $panel;

    // Find tabPanels by href hash of the trigger, eg: '<a href="#panel-1">'
    if(this.$triggers) {
        this.$triggers.each(function(i,trigger) {
            if(trigger.hash) {
                $panel = $(trigger.hash);
                if($panel.length > 0) {
                    tabPanels.push($panel);
                }
            }
        });
    }

    if(tabPanels.length > 0) {
        this.$tabPanels = $(tabPanels).map (function() { return this.toArray(); });
    }
};

TagiUI.Tabs.prototype.selectedTab = function() {
    var $selected;

    $selected = this.$triggers.filter('[aria-selected="true"]');
    if($selected.length === 0){
        $selected = this.$triggers.first();
        $selected.attr('aria-selected','true');
    }
    return $selected;
};

// Init all tabPanels
TagiUI.Tabs.prototype.initTabPanels = function() {
    var $selected = this.selectedTab();

    // Hide all non selected tabPanels
    this.$tabPanels.not($selected[0].hash)
        .attr({
            "aria-hidden":"true",
            "aria-visible":"false",
            "aria-expanded":"false"
        })
        .hide();

    // Show selected tabPanel
    this.$tabPanels.filter($selected[0].hash)
        .attr({
            "aria-hidden":"false",
            "aria-visible":"true",
            "aria-expanded":"true"
        })
        .show();
};

TagiUI.Tabs.prototype.toggleElements = function(trigger) {

    if($(trigger).attr('aria-selected') === "true") {
        return; // already active
    }

    var self = this,
        $target = this.$tabPanels.filter(trigger.hash),
        $triggers = $(trigger).add(this.$triggers.filter('[aria-selected="true"]')),
        $visiblePanel = this.$tabPanels.filter(':visible');

    // toggle trigger attribute: aria-selected
    $triggers.each(function() {
        self.toggleAttributes(this);
    });

    // toggle visibility and attributes of tabpanels
    $visiblePanel.add($target).each(function() {
        $(this).toggle();
        self.toggleAttributes(this);
    })

};

// Assign the Toggler module to each element
// and call the toggle method
TagiUI.Tabs.prototype.toggleAttributes = function(el) {
    if(!$(el).data('toggler')){
        var instance = new TagiUI.Toggler().init(el, this.toggleOptions);
    }
    $(el).data('toggler').toggleAttribute();
};




;(function($, win, doc, undefined) {
    $(doc).on('ajax_inserted dom_loaded', function() {
        $.fn.toggler = function() {
            return this.each(function() {
                if(!$(this).data('toggleme')) {
                    var instance = new TagiUI.Toggler().init(this);
                }
            });
        };
        $("[data-toggler]").toggler();

        $.fn.accordion = function() {
            return this.each(function() {
                if(!$(this).data('accordion')) {
                    var instance = new TagiUI.Accordion().init(this);
                }
            });
        };
        $("[data-accordion]").accordion();

        $.fn.tabs = function() {
            return this.each(function() {
                if(!$(this).data('tabs')) {
                    var instance = new TagiUI.Tabs().init(this);
                }
            });
        };
        $("[data-tabs]").tabs();
    });

    $(function() {
        $(doc).trigger('dom_loaded');
    });
})(jQuery, window, document);
