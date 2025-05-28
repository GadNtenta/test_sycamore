class Medecin {
  final String firstName;
  final String lastName;
  final String specialty;
  final String phone;

  Medecin({
    required this.firstName,
    required this.lastName,
    required this.specialty,
    required this.phone,
  });

  factory Medecin.fromJson(Map<String, dynamic> json) {
    return Medecin(
      firstName: json['firstName']?.toString() ?? '',
      lastName: json['lastName']?.toString() ?? '',
      specialty: json['specialty']?.toString() ?? '',
      phone: json['phone']?.toString() ?? '',
    );
  }
}
