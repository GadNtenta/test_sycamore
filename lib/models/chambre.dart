class Chambre {
  final String number;
  final String floor;
  final int capacity;
  final String status;

  Chambre({
    required this.number,
    required this.floor,
    required this.capacity,
    required this.status,
  });

  factory Chambre.fromJson(Map<String, dynamic> json) {
    return Chambre(
      number: json['number']?.toString() ?? '',
      floor: json['floor']?.toString() ?? '',
      capacity: json['capacity']?.toInt() ?? 0,
      status: json['status']?.toString() ?? 'free',
    );
  }
}
