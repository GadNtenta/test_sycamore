class Patient {
  final String firstName;
  final String lastName;
  final int age;
  final String healthStatus;

  Patient({
    required this.firstName,
    required this.lastName,
    required this.age,
    required this.healthStatus,
  });

  factory Patient.fromJson(Map<String, dynamic> json) {
    return Patient(
      firstName: json['firstName']?.toString() ?? '',
      lastName: json['lastName']?.toString() ?? '',
      age: json['age']?.toInt() ?? 0,
      healthStatus: json['healthStatus']?.toString() ?? 'stable',
    );
  }
}
