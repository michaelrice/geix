/*
 *    (c) Copyright 2016 Michael Rice <michael@michaelrice.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



$(document).ready(function () {
  'use strict';
  var info_site = "http://127.0.0.1:8080";
  fetchjsonMap(info_site);

  function fetchjsonMap(site) {
    $.ajax({
      url: site.concat("/index.json"),
      type: "GET",
      dataType: "json",
      success: function(data) {
        findMatchingHelpDoc(data, site)
      },
      error: function() {
        fetchHelpError()
      }
    });
  }

  function findMatchingHelpDoc(data, site) {
    // Setup a regex using the data
    var doc_page_to_match = $(location).attr("pathname");
    // loop though the keys in the data file looking for a key that
    // matches the pathname
    var catalog = data["Catalog"];
    var arrayLen = catalog.length;
    var doc_to_serve;
    for(var i=0; i<arrayLen; i++) {
      var re = new RegExp(catalog[i]["regex"]);
      var matches = re.exec(doc_page_to_match);
      if(matches) {
        doc_to_serve = catalog[i]["doc"];
        break;
      }
      if(i === arrayLen-1) {
        fetchHelpError();
        return;
      }
    }
    fetchHelpPage(site.concat(doc_to_serve));
  }

  function fetchHelpPage(page) {
    $.ajax({
      url: page,
      type: "GET",
      dataType: "html",
      success: function(data) {
        fetchHelpPageSuccess(data)
      },
      error: function() {
        fetchHelpError()
      }
    });
  }

  function fetchHelpPageSuccess(data) {
    $('#help-info-content').empty();
    $('#help-info-content').html(data);
    $('div.help-info-container').addClass('ui-dragabble');
    setInfobarHeight();
    $('#main_content').append()
    $('div.help-info-container').show();

  }

  function fetchHelpError() {
    $('#help-info-content').parent().empty().remove();
  }

  function setInfobarHeight() {
    var control_bar_height = $("#help-info-control-bar").height();
    var main_content_height = $("#main_content").height();
    var side_bar_height = $("#sidebar").height();
    var max_height = main_content_height;
    if(side_bar_height > main_content_height) {
      max_height = side_bar_height;
    }
    var help_content_height = max_height - control_bar_height;
    $('#help-info-content').height(help_content_height);
    console.log("control ".concat(control_bar_height));
    console.log("main ".concat(main_content_height));
    console.log("help ".concat(help_content_height));
    console.log("max " + max_height);
  }

  $('div#help-info-control-bar').click(function(e) {
    setInfobarHeight();
    $(this).parent().find('#help-info-content').toggle();
    console.log("clicked the toggle");
  })
});