$(document).ready(function () {

    // Add an event listener to the "Update" buttons
    $('.update-button').on('click', function () {
        const interviewId = $(this).data('interview-id');

        // Toggle the visibility of interview details and edit form
        $(`.interview-edit-form`).hide();
        $(`#interview-edit-form-${interviewId}`).show();
    });

    // Add an event listener for the edit form submission
    $('.interview-edit-form').on('submit', function (e) {

        // e.preventDefault();
        const interviewId = $(this).attr('id').split('-')[3]; // Extract interviewId
        const formData = $(this).serialize(); // Serialize form data
        const updatedinterview = {}; // Create an object to store updated interview data
        
        // Extract updated interview data from the form
        $(this).find('input, select').each(function () {
            const fieldName = $(this).attr('name');
            const fieldValue = $(this).val();
            updatedinterview[fieldName] = fieldValue;
        });

        // Send an AJAX request to update interview details
        $.ajax({
            type: 'POST',
            url: `/interviews/updateinterview/${interviewId}`, // Define your update route
            data: formData,
            success: function (response) {
                
                // Update the view with the edited interview details
                $(`#interview-edit-form-${interviewId}`).hide();

                // Update the existing row with the updated data
                $(`#interview-status-${interviewId}`).text(updatedinterview.status);

            },
            error: function (error) {
                console.error('Error updating interview details: ', error);
            },
        });
    });
});
