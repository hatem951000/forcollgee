class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();
/////////////////
function ekUpload(){
	function Init() {
  
	  console.log("Upload Initialised");
  
	  var fileSelect    = document.getElementById('file-upload'),
		  fileDrag      = document.getElementById('file-drag'),
		  submitButton  = document.getElementById('submit-button');
  
	  fileSelect.addEventListener('change', fileSelectHandler, false);
  
	  // Is XHR2 available?
	  var xhr = new XMLHttpRequest();
	  if (xhr.upload) {
		// File Drop
		fileDrag.addEventListener('dragover', fileDragHover, false);
		fileDrag.addEventListener('dragleave', fileDragHover, false);
		fileDrag.addEventListener('drop', fileSelectHandler, false);
	  }
	}
  
	function fileDragHover(e) {
	  var fileDrag = document.getElementById('file-drag');
  
	  e.stopPropagation();
	  e.preventDefault();
  
	  fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
	}
  
	function fileSelectHandler(e) {
	  // Fetch FileList object
	  var files = e.target.files || e.dataTransfer.files;
  
	  // Cancel event and hover styling
	  fileDragHover(e);
  
	  // Process all File objects
	  for (var i = 0, f; f = files[i]; i++) {
		parseFile(f);
		uploadFile(f);
	  }
	}
  
	// Output
	function output(msg) {
	  // Response
	  var m = document.getElementById('messages');
	  m.innerHTML = msg;
	}
  
	function parseFile(file) {
  
	  console.log(file.name);
	  output(
		'<strong>' + encodeURI(file.name) + '</strong>'
	  );
	  
	  // var fileType = file.type;
	  // console.log(fileType);
	  var imageName = file.name;
  
	  var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
	  if (isGood) {
		document.getElementById('start').classList.add("hidden");
		document.getElementById('response').classList.remove("hidden");
		document.getElementById('notimage').classList.add("hidden");
		// Thumbnail Preview
		document.getElementById('file-image').classList.remove("hidden");
		document.getElementById('file-image').src = URL.createObjectURL(file);
	  }
	  else {
		document.getElementById('file-image').classList.add("hidden");
		document.getElementById('notimage').classList.remove("hidden");
		document.getElementById('start').classList.remove("hidden");
		document.getElementById('response').classList.add("hidden");
		document.getElementById("file-upload-form").reset();
	  }
	}
  
	function setProgressMaxValue(e) {
	  var pBar = document.getElementById('file-progress');
  
	  if (e.lengthComputable) {
		pBar.max = e.total;
	  }
	}
  
	function updateFileProgress(e) {
	  var pBar = document.getElementById('file-progress');
  
	  if (e.lengthComputable) {
		pBar.value = e.loaded;
	  }
	}
  
	function uploadFile(file) {
  
	  var xhr = new XMLHttpRequest(),
		fileInput = document.getElementById('class-roster-file'),
		pBar = document.getElementById('file-progress'),
		fileSizeLimit = 1024; // In MB
	  if (xhr.upload) {
		// Check if file is less than x MB
		if (file.size <= fileSizeLimit * 1024 * 1024) {
		  // Progress bar
		  pBar.style.display = 'inline';
		  xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
		  xhr.upload.addEventListener('progress', updateFileProgress, false);
  
		  // File received / failed
		  xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
			  // Everything is good!
  
			  // progress.className = (xhr.status == 200 ? "success" : "failure");
			  // document.location.reload(true);
			}
		  };
  
		  // Start upload
		  xhr.open('POST', document.getElementById('file-upload-form').action, true);
		  xhr.setRequestHeader('X-File-Name', file.name);
		  xhr.setRequestHeader('X-File-Size', file.size);
		  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
		  xhr.send(file);
		} else {
		  output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
		}
	  }
	}
  
	// Check for the various File API support.
	if (window.File && window.FileList && window.FileReader) {
	  Init();
	} else {
	  document.getElementById('file-drag').style.display = 'none';
	}
  }
  ekUpload();