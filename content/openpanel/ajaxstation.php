<?php
if ( $_POST['panelid'] == 'nuxion' ) { // If exist OpenFooter ID
?>

	<!-- OpenPanel Package -->
    <div id="nuxion" class="op-panel solid-lightblue">
		
		<!-- Control -->
    	<div class="op-panelctrl solid-black">
		
            <!-- Close Button -->
            <div data-close='nuxion' class="op-panelbt op-bt-close">
                <img src="images/arrow-left-48.png" alt="close" />
            </div>
            <!-- End Close button -->
			
			<!-- Close All to Close All Panels -->
            <div class="op-panelbt op-bt-closeall floatright">
                <img src="images/close-white-48a.png" alt="close all" />
            </div>
            <!-- End Close All -->
            
            <div class="clearspace"></div>
        </div>
        <!-- End Control -->
        
        
    	<!-- Panel Content -->
        <div class='op-panelform'>
        
        <div class="img-holder" style="text-align:center; margin-bottom:20px;">
			<a href="http://docs.sonhlab.com/nuxion-jquery-responsive-ux-navigation-menu/" target="_blank">
				<img src="images/demo/nuxion-jquery-banner.png" alt="Nuxion jQuery Plugin" class="responsive-img" />
			</a>
    	</div>
        
        
        </div>
        <!-- End Panel Content -->
        
    </div>
    <!-- END OpenPanel -->


<?php 

}

elseif ( $_POST['panelid'] == 'menustation' ) {
	include_once('menustation.html');
}

elseif ( $_POST['panelid'] == 'metrobox' ) {
	include_once('metrobox.html');
}

elseif ( $_POST['panelid'] == 'metronav' ) {
	include_once('metronav.html');
}

elseif ( $_POST['panelid'] == 'metropanel' ) {
	include_once('metropanel.html');
}

elseif ( $_POST['panelid'] == 'metrotabs' ) {
	include_once('metrotabs.html');
}

elseif ( $_POST['panelid'] == 'openpanel' ) {
	include_once('openpanel.html');
}

elseif ( $_POST['panelid'] == 'screenslider' ) {
	include_once('screenslider.html');
}

elseif ( $_POST['panelid'] == 'socialauth' ) {
	include_once('socialauth.html');
}


// Not Found Content
else { ?>
<!-- Start Empty Content Block -->
<div id="<?php echo $_POST['panelid']; ?>" class="op-panel solid-black light-text">

		<!-- Control -->
    	<div class="op-panelctrl solid-black">
		
            <!-- Close Button -->
            <div data-close='<?php echo $_POST['panelid']; ?>' class="op-panelbt op-bt-close">
                <img src="images/arrow-left-48.png" alt="close" />
            </div>
            <!-- End Close button -->
			
			<!-- Close All to Close All Panels -->
            <div class="op-panelbt op-bt-closeall floatright">
                <img src="images/close-white-48a.png" alt="close all" />
            </div>
            <!-- End Close All -->
            
            <div class="clearspace"></div>
        </div>
        <!-- End Control -->
        
        
    	<!-- Panel Content -->
        <div class='op-panelform'>
			<p style="text-align:center;">
			Opps! Empty content :-[
			</p>
        </div>
        <!-- End Panel Content -->
		
</div>
<!-- End Empty Content Block -->
<?php
}
?>