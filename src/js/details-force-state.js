(function() {
  if( !("querySelectorAll" in document) || !("from" in Array) ) {
    return;
  }

  // This is a var, `let` caused an error in Safari 13
  var attr = {
    base: "data-force-state",
    forceState: "data-force-state-closed",
  };
  var classes = {
    init: "details-enhanced"
  };

  function forceState(detail, setOpen) {
    if( setOpen ) {
      detail.setAttribute("open", "open");
    } else {
      detail.removeAttribute("open");
    }
  }

  function getMatchMedia(detail) {
    if(!detail || !("matchMedia" in window)) return;

    let forceClosed = detail.getAttribute(attr.forceState);
    if(forceClosed) {
      return window.matchMedia(forceClosed);
    }
  }

  let details = Array.from(document.querySelectorAll(`details[${attr.base}]`));
  for(let detail of details) {
    detail.classList.add(classes.init);
    let mm = getMatchMedia(detail);

    if( mm ) {
      forceState(detail, !mm.matches);
      // Force stated based on details-force-state-closed attribute value in a media query listener
      mm.addListener(function(e) {
        forceState(detail, !e.matches);
      });
    }
  }
})();
