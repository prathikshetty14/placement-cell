$(document).ready(function () {

    // Add an event listener to the "Update" buttons
    $('.update-button').on('click', function () {

        const studentId = $(this).data('student-id');

        // Toggle the visibility of student details and edit form
        $(`.student-edit-form`).hide();
        $(`#student-edit-form-${studentId}`).show();
    });

    // Add an event listener for the edit form submission
    $('.student-edit-form').on('submit', function (e) {

        e.preventDefault();
        const studentId = $(this).attr('id').split('-')[3]; // Extract studentId
        const formData = $(this).serialize(); // Serialize form data
        const updatedStudent = {}; // Create an object to store updated student data
        
        // Extract updated student data from the form
        $(this).find('input, select').each(function () {
            
            const fieldName = $(this).attr('name');
            const fieldValue = $(this).val();
            updatedStudent[fieldName] = fieldValue;
        });

        // Send an AJAX request to update student details
        $.ajax({
            type: 'POST',
            url: `/students/updateStudent/${studentId}`, // Define your update route
            data: formData,
            success: function (response) {
                // Update the view with the edited student details
                $(`#student-edit-form-${studentId}`).hide();

                // Update the existing row with the updated data
                $(`#student-name-${studentId}`).text(updatedStudent.name);
                $(`#student-email-${studentId}`).text(updatedStudent.email);
                $(`#student-college-${studentId}`).text(updatedStudent.college);
                $(`#student-dsa-${studentId}`).text(updatedStudent.DSAscores);
                $(`#student-webd-${studentId}`).text(updatedStudent.WEBDscores);
                $(`#student-react-${studentId}`).text(updatedStudent.REACTscores);
                $(`#student-status-${studentId}`).text(updatedStudent.status);
                $(`#student-final-${studentId}`).text(updatedStudent.FINALresult);

                location.reload();
            },
            error: function (error) {
                console.error('Error updating student details: ', error);
            },
        });
    });
});
