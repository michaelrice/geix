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

  var $doc_page_to_get = $(location).attr("pathname");
  var $info_site = "http://127.0.0.1:8080";
  if($doc_page_to_get.endsWith("/")) {
    $doc_page_to_get = $doc_page_to_get.slice(0, -1);
    $doc_page_to_get = $info_site.concat($doc_page_to_get.concat(".html"));
  }
  $.ajax({
    url: $doc_page_to_get,
    type: "GET",
    dataType: "html",
    success: function (data) {
      $('#help-info-content').empty();
      $('#help-info-content').html(data);
    },
    error: function () {
      $('#help-info-content').remove();
    }
  });
});