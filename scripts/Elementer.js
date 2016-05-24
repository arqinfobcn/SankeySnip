function Elementer() {

  var self = this;
  var elements_, detail_, layout_, container_, main_, classes_, root_,initial_, initialSource_ ="standard",standard_;

  // the default layout
  // anything added by .setLayout() will be merged with this
  var defLayout_ = {

    settings: {
      prefix: "layout",
      root: "root"
    },

    pages: {
      root: {
        label: "Settings",
        items: [],
        classes: {
          branch: "",
          nav: {
            prevIcon: ""
          }
        }
      }
    }
  };
  
  // anything added with setClasses() will be merged with this
  var defClasses_ = {
    branch: "mui-container",
    subhead: "mui--text-subhead",
    backLabel: "mui--text-dark-secondary mui--text-caption",
    title: "mui--text-title",
    table: "mui-table",
    tr: "",
    td: "",
    label: "mui--text-dark-secondary",
    element: "",
    elementContainer: "",
    tdElement: "mui--text-right mui--align-middle",
    tdLabel: "",
    icon: "mui--text-dark-secondary material-icons md-18",
    tdIcon: "mui--align-middle",
    option:"",
    nav: {
      nextIcon: "chevron_right",
      prevIcon: "chevron_left"
    },
    hide: "mui--hide",
    show: "mui--show"
  };
  
  var defStyles_ = {
    td: "padding:3px",
    tdLabel: "padding:3px",
    tdIcon: "padding:3px",
    tdElement: "padding:3px",
    backLabel:"position:relative;vertical-align: middle;",
    icon:"vertical-align: middle;",
    elementContainer:"padding:0px;margin:0;",
    navCursor:"cursor: pointer; cursor: hand;",
    backLabel:"cursor: pointer; cursor: hand;"
  };
  
  var defDetail_ = {
    selectTemplate: {
      tag: "SELECT",
      classes:{
        elementContainer:"mui-select"
      },
      values:{
        property:"value",
        resetable:true
      }
    },
    textAreaTemplate: {
      tag: "TEXTAREA",
      label:"Input text area",
      classes:{
        elementContainer:"mui-textfield"
      },
      values:{
        property:"value",
        resetable:true,
        value:"",
      }
    },
    buttonTemplate:{
      tag:"BUTTON",
      label:"",
      classes:{
        element:"mui-btn"
      },
      properties:{
        type:"button"
      },
      values:{
        property:"innerHTML",
        value:"Submit",
        resetable:false
      }
    },
    textTemplate: {
      tag: "INPUT",
      label: "Input text",
      icon: "input",
      properties: {
        type: "text"
      },
      styles: {
        element: "max-width:100px;"
      },
      classes:{
        elementContainer:"mui-textfield"
      },
      values: {
        property:"value",
        value:"",
        resetable:true
      }
    },
    numberTemplate: {
      tag: "INPUT",
      label: "Input number",
      icon: "input",
      properties: {
        type: "number",
        min: 0,
        max: 100
      },
      classes:{
        elementContainer:"mui-textfield"
      },
      values: {
        property:"value",
        value:0,
        resetable:true
      }
    },
    checkboxTemplate: {
      tag: "INPUT",
      properties: {
        type: "checkbox"
      },
      classes:{
        elementContainer:"mui-checkbox"
      },
      values: {
        property:"checked",
        value:false,
        resetable:true
      }
    },
    radioTemplate: {
      tag: "INPUT",
      properties: {
        type: "radio",
        name: "radioGroup"
      },
      classes:{
        elementContainer:"mui-radio"
      },
      values: {
        property:"checked",
        value:false,
        resetable:true
      }
    },
    subheadTemplate: {
      label: "subhead",
      classes: {
        label: "mui--text-subhead"
      }
    },
    dividerTemplate: {
      label: "subhead",
      classes: {
        label: "mui--text-subhead"
      }
    },
    contentTemplate: {
      label: "some content",
      classes: {
        label: "mui--text-dark-primary mui--text-body1"
      }
    }
  };
  
 /**
  * these are the computed values/styles and classes generated by the elementer
  * @return {object} the computed values/styles etc
  */
  self.getStandard = function () {
    return standard_;
  };
  
  /**
  * these are the computed values/styles and classes generated by the elementer
  * @return {object} the computed values/styles etc
  */
  self.getInitial = function () {
    return initial_;
  };
  
  self.setInitial = function (initial,initialSource) {
    if (initial) {
      initialSource_ = initialSource;
      initial_ = initial;
      self.restoreInitial();
      return self.getInitial();
    }
    
    return null;
  };
  
  /**
   * return the elements generated
   * @return {object} the element view
   */
  self.getElements = function() {
    return elements_;
  };

  /**
   * @param {object} detail an object with the item details
   * @return {Elementer} self
   */
  self.setDetail = function(detail) {
    detail_ = Utils.vanMerge([defDetail_, detail]);
    return self;
  };

  /**
   * @param {object} detail an object with the item layout
   * @return {Elementer} self
   */
  self.setLayout = function(layout) {
    layout_ = Utils.vanMerge([defLayout_, layout]);
    return self;
  };

  /**
   * this is the container that hosts the main
   * content of the elementer
   * @param {string|element} container elementer content
   * @return {Elementer} self
   */
  self.setContainer = function(container) {
    container_ = DomUtils.elem(container);
    return self;
  };

  /**
   *this is the container of the main page hosting the 
   * link to the elementer content
   * if specified it will be hidden or shown 
   * depending on whether we are at the top level
   * @param {string|element} main main hosting element
   * @return {Elementer} self
   */
  self.setMain = function(main) {
    main_ = DomUtils.elem(main);
    return self;
  };

  /**
   *this is the root element
   * which will normally be a child of main
   * @param {string|element} root hook to elementer
   * @return {Elementer} self
   */
  self.setRoot = function(root) {
    root_ = DomUtils.elem(root);
    return self;
  };

  /**
   *this is an object with the required formatting classes
   * if you are using muicss, then this is optional
   * @param {object} classes your class definitions to merge
   * @return {Elementer} self
   */
  self.setClasses = function(classes) {
    classes_ = Utils.vanMerge([defClasses_, classes]);
    return self;
  };
  
  /**
   * put the settings back to standard
   * @return {Elementer} self
   */
  self.restorestandard = function() {
    self.applySettings (standard_);
    return self;
  };
  
  /**
   * put the settings back to what they were initially
   * @return {Elementer} self
   */
  self.restoreInitial = function() {
    self.applySettings (initial_);
    return self;
  }
  
  self.applySettings = function (target) {
    if (!target) return false;
    
    // reset all the settable values
    Object.keys(target).forEach(function(k) {
      elements_.controls[k][elements_.values[k].property] = target[k];
    });
    
    return true;
  };
  
  self.getCurrent = function () {
    return Object.keys(initial_).reduce(function(p,c) {
      p[c] = elements_.controls[c][elements_.values[c].property]
      return p;
    },{});
  };
  /**
   *this creates the elements
   * @return {Elementer} self
   */
  self.build = function() {
    // in case just using default
    classes_ = classes_ || defClasses_;
    // check we have all needed
    if (!detail_ || !layout_ || !container_ || !root_) {
      throw 'a container, detail, root and layout are all required'
    }

    // this is the final result
    elements_ = {
      controls: {},
      pages: {},
      clicked: {},
      values:{}
    };
    
    // this is the computed styles etc.
    initial_ = {};

    // clear out the container
    container_.innerHTML = "";

    // short cut
    var ea = DomUtils.addElem;

    // do the root
    doLayout(root_, layout_.settings.root, layout_, detail_);

    // do the others
    Object.keys(layout_.pages).forEach(function(k) {
      if (k !== layout_.settings.root) {
        doLayout(container_, k, layout_, detail_);
      }
    });

    // set the initial visibility state
    var rt = layout_.settings.root;
    var onEnter = layout_.pages[rt].on ? layout_.pages[rt].on.enter : null;
    showThis(elements_.pages[rt], onEnter);
    return self;

    function doLayout(parent, branchName, layout, details) {

      // working on this layout
      var lob = layout.pages[branchName];

      // merge with any specific classes for this layout page
      var ec = Utils.vanMerge([classes_, lob.classes]);
      var es = Utils.vanMerge ([defStyles_ , lob.styles  || {}]);

      // the container for this layout
      var dv = ea(parent, "div", "", ec.branch);
      dv.id = layout.settings.prefix + "-" + branchName;

      elements_.pages[branchName] = dv;

      // prev icon - hide this and go back to whoever called
      if (ec.nav.prevIcon) {
        var dvp = ea(dv, "div", "", ec.backLabel, es.backLabel);
        var backIcon = ea(dvp, "span", ec.nav.prevIcon, ec.icon, es.icon);
        ea(dvp, "span", "Back to ???", ec.backLabel, es.backLabel).id = layout.settings.prefix + "-" + branchName + "-backcomment";
        dvp.addEventListener('click', function(e) {
          
          // do exit processing
          var onExit = layout_.pages[branchName].on ? layout_.pages[branchName].on.exit : null;
          if (onExit) {
            onExit(self, branchName);
          }
          
          // do entry to the new page processing
          var elb = elements_.clicked[branchName];
          var onEnter = layout_.pages[elb.branchName].on ? layout_.pages[elb.branchName].on.enter : null;
          showThis(elb.element, onEnter);
        });

      }

      // use a table to lay out
      var tab = ea(dv, "table", "", ec.table, es.table);
      // the section title
      var tr = ea(tab, "tr", "", ec.tr, es.tr);

      if (ec.nav.prevIcon) {
        var td = ea(tr, "td", "", ec.td, es.td);
        td.colSpan = 3;
        ea(td, "span", DomUtils.fillLabel(lob.label), ec.title, es.title);
      }

      lob.items.forEach(function(d) {
        if (layout.pages[d]) {
          // its a reference to another section
          var ob = layout.pages[d];
          // bring in any override classes
          var fc = Utils.vanMerge([ec, ob.classes]);
          var fs = Utils.vanMerge([es, ob.styles]);
          var tr = ea(tab, "tr", "", fc.tr, fc.nav.nextIcon ? fs.navCursor : fs.tr);

          // the icon

          if (ob.icon) {
            var td = ea(tr, "td", "", fc.tdIcon, fs.tdIcon);
            ea(td, "i", ob.icon, fc.icon, fs.icon);
          }

          // the label
          var td = ea(tr, "td", "", fc.tdLabel, fs.tdLabel);
          var label = ob.label ? ea(td, "label", DomUtils.fillLabel(ob.label), fc.subhead, fs.subhead) : null;
          if (!ob.icon) {
            td.colSpan = 2;
          }
          // the next icon
          var td = ea(tr, "td", "", fc.tdIcon, fs.tdIcon);
          
          function clickPointer (elem , itemName, brName ) {
            elem.addEventListener ('click', function () {
              if (!elements_.clicked[itemName] || itemName !== layout.settings.root) {
                elements_.clicked[itemName] = {
                  element: dv,
                  branchName: brName
                }
                var backComment = DomUtils.elem(layout.settings.prefix + "-" + d + "-backcomment");
                if (backComment) {
                  var lb = DomUtils.fillLabel(layout_.pages[brName].label);
                  backComment.innerHTML = "Back to " + lb;
                }
              }
              var onEnter = layout_.pages[itemName].on ? layout_.pages[itemName].on.enter : null;
              showThis(layout.settings.prefix + "-" + itemName, onEnter);
            });
          }
          
          // add navigation to next level
          if (fc.nav.nextIcon) {
            ea(td, "i", fc.nav.nextIcon, fc.icon, fs.icon);
            clickPointer (tr,d, branchName);
          }

        } else {
          // it should be some real stuff
          if (!details[d]) {
            throw d + ' layout reference not found in details';
          }
          if (details[d].template && !details[details[d].template]) {
            throw 'template ' + details[d].template + ' not found';
          }
          var ob = Utils.vanMerge([details[details[d].template], details[d]]);

          var fc = Utils.vanMerge([ec, ob.classes]);
          var fs = Utils.vanMerge([es, ob.styles]);
          var tr = ea(tab, "tr", "", fc.tr, fs.tr);
          

          // the label
          if (ob.custom && ob.custom.spanCols) {
            
            // this element spans all columns
            var td = ea(tr, "td", "", fc.tdElement, fs.tdElement);
            td.colSpan = 3;
          }
          else {
                    
            // the icon
            if (ob.icon) {
              var td = ea(tr, "td", "", fc.tdIcon, fs.tdIcon);
              ea(td, "i", ob.icon, fc.icon);
            }
            var td = ea(tr, "td", "", fc.tdLabel, fs.tdLabel);
            var label = ob.label ? ea(td, "label", DomUtils.fillLabel(ob.label), fc.label, fs.label) : null;
            if (!ob.icon) {
              td.colSpan = 2;
            }

            // the element
            var td = ea(tr, "td", "", fc.tdElement, fs.tdElement);
          
          }

          if (ob.tag) {
            var ediv = ea(td, "span", "", fc.elementContainer, fs.elementContainer);
            var elem = ea(ediv, ob.tag, "", fc.element, fs.element);
            elem.id = dv.id + "-" + d + "-elem";
            if (label) label['for'] = elem.id;
            
            // this should only apply to selects
            // but i'll leave it unchecked and just do it anyway
            if (ob.options){
                ob.options.forEach(function(g){
                  ea (elem,"option",g,fc.option,fs.option).value = g;
                });
            }
            if (ob.properties) {
              Object.keys(ob.properties).forEach(function(e) {
                elem[e] = ob.properties[e];
              });
            }

            if (ob.values && ob.values.property) {
              elem[ob.values.property] = ob.values.value;
              elements_.values[d] = ob.values;
              if(ob.values.resetable) {
                initial_[d] = ob.values.value;
              }
            }
            elements_.controls[d] = elem;
          }

        }
      });
      standard_ = Utils.clone(initial_);
      return dv;

    }

    function showThis(keep, onEnter) {
      var dh = DomUtils.hide,
        de = DomUtils.elem,
        ep = elements_.pages;

      // ensure all other pages are hidden
      Object.keys(ep).forEach(function(p) {
        dh(ep[p], true, classes_.hide);

      });

      // if the active page is the root then show the main too.
      if (main_) {
        var showMain = de(keep).id === ep[layout_.settings.root].id;
        dh(main_, !showMain, classes_.hide);
      }

      // do any on enter 
      if (onEnter) {
        onEnter(self, de(keep).id.match(/-(.+)$/)[1])
      }

      // show the active page
      dh(keep, false, classes_.hide);
    }

  };

};